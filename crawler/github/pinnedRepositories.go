package github

import (
	"bytes"
	"crypto/sha1"
	"encoding/base64"
	"encoding/gob"
	"fmt"
	"github.com/PuerkitoBio/goquery"
	"github.com/imroc/req"
	"github.com/robfig/cron/v3"
	"hexiro/config"
)

var (
	Repos []Repository
	Etag  = "Default"
)

func init() {
	if config.Server.Production() {
		FetchPinnedRepos()
		c := cron.New()
		c.AddFunc("@hourly", FetchPinnedRepos)
		c.Start()
	}
}

func sliceToHash(slice []Repository) string {
	var buf bytes.Buffer
	encoder := gob.NewEncoder(&buf) // Will write to network.
	for _, item := range slice {
		_ = encoder.Encode(item)
	}
	hasher := sha1.New()
	hasher.Write(buf.Bytes())
	return base64.URLEncoding.EncodeToString(hasher.Sum(nil))
}


func FetchPinnedRepos() {
	var repos []Repository
	var rawRepos []rawRepository
	res, err := req.Get("https://github.com/" + config.Me.Github)
	if err != nil || res.Response().StatusCode != 200 {
		return
	}

	doc, err := goquery.NewDocumentFromReader(res.Response().Body)
	if err != nil {
		return
	}

	// more of an xpath guy myself, but this will do
	doc.Find(".pinned-item-list-item").Each(func(_ int, selection *goquery.Selection) {
		if len(repos) < 3 {
			nameElement := selection.Find(".repo")
			ownerElement := nameElement.SiblingsFiltered(".owner.text-normal")
			var owner string
			switch text := ownerElement.Text(); text {
			case "":
				owner = config.Me.Github
			default:
				owner = text
			}
			rawRepos = append(rawRepos, rawRepository{
				name:  nameElement.Text(),
				owner: owner,
			})
		}

	})

	for _, rawRepo := range rawRepos {
		resp, err := req.Get("https://api.github.com/repos/" + rawRepo.owner + "/" + rawRepo.name)
		if err != nil {
			return
		}
		var repo Repository
		err = resp.ToJSON(&repo)
		if err != nil {
			return
		}
		repos = append(repos, repo)
	}
	Repos = repos
	Etag = sliceToHash(Repos)
	fmt.Println(Etag)
	fmt.Println(Repos)
	return
}
