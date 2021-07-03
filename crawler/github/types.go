package github

import (
	"time"
)

type rawRepository struct {
	name  string
	owner string
}

type License struct {
	Key    string `json:"key"`
	Name   string `json:"name"`
	SpdxId string `json:"spdx_id"`
	Url    string `json:"url"`
	NodeId string `json:"node_id"`
}

type Owner struct {
	Login             string `json:"login"`
	Id                int    `json:"id"`
	NodeId            string `json:"node_id"`
	AvatarUrl         string `json:"avatar_url"`
	GravatarId        string `json:"gravatar_id"`
	Url               string `json:"url"`
	HtmlUrl           string `json:"html_url"`
	FollowersUrl      string `json:"followers_url"`
	FollowingUrl      string `json:"following_url"`
	GistsUrl          string `json:"gists_url"`
	StarredUrl        string `json:"starred_url"`
	SubscriptionsUrl  string `json:"subscriptions_url"`
	OrganizationsUrl  string `json:"organizations_url"`
	ReposUrl          string `json:"repos_url"`
	EventsUrl         string `json:"events_url"`
	ReceivedEventsUrl string `json:"received_events_url"`
	Type              string `json:"type"`
	SiteAdmin         bool   `json:"site_admin"`
}

type Parent struct {
	Id       int    `json:"id"`
	NodeId   string `json:"node_id"`
	Name     string `json:"name"`
	FullName string `json:"full_name"`
	Private  bool   `json:"private"`
	Owner    Owner  `json:"owner"`
}

func (p Parent) HtmlUrl() string {
	return p.Owner.HtmlUrl + "/" + p.Name
}

type Repository struct {
	Id              int       `json:"id"`
	NodeId          string    `json:"node_id"`
	Name            string    `json:"name"`
	FullName        string    `json:"full_name"`
	Private         bool      `json:"private"`
	Owner           Owner     `json:"owner"`
	HtmlUrl         string    `json:"html_url"`
	Description     string    `json:"description"`
	Fork            bool      `json:"fork"`
	Url             string    `json:"url"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
	PushedAt        time.Time `json:"pushed_at"`
	GitUrl          string    `json:"git_url"`
	SshUrl          string    `json:"ssh_url"`
	CloneUrl        string    `json:"clone_url"`
	Homepage        string    `json:"homepage"`
	Size            int       `json:"size"`
	StargazersCount int       `json:"stargazers_count"`
	WatchersCount   int       `json:"watchers_count"`
	Language        string    `json:"language"`
	HasIssues       bool      `json:"has_issues"`
	HasProjects     bool      `json:"has_projects"`
	HasDownloads    bool      `json:"has_downloads"`
	HasWiki         bool      `json:"has_wiki"`
	HasPages        bool      `json:"has_pages"`
	ForksCount      int       `json:"forks_count"`
	Archived        bool      `json:"archived"`
	Disabled        bool      `json:"disabled"`
	OpenIssuesCount int       `json:"open_issues_count"`
	License         License   `json:"license"`
	Forks           int       `json:"forks"`
	OpenIssues      int       `json:"open_issues"`
	Watchers        int       `json:"watchers"`
	DefaultBranch   string    `json:"default_branch"`
	Parent          Parent    `json:"parent"`
	Organization    Owner     `json:"organization"`
	//Source           Repository `json:"source"`
	NetworkCount     int `json:"network_count"`
	SubscribersCount int `json:"subscribers_count"`
}
