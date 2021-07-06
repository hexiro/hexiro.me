package config

import (
	"github.com/kelseyhightower/envconfig"
	"gopkg.in/yaml.v2"
	"hexiro/directory"
	"math/rand"
	"os"
	"time"
)

var Config = func() FullConfig {
	file, err := os.Open(directory.Resolve("config.yaml"))
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var config FullConfig
	decoder := yaml.NewDecoder(file)
	err = decoder.Decode(&config)
	if err != nil {
		panic(err)
	}
	err = envconfig.Process("", &config)
	if err != nil {
		panic(err)
	}
	return config
}()

var (
	Me       = Config.Me
	Server   = Config.Server
	Messages = Config.Messages
)

func (m MeConfig) Age() int {
	// subtract birth time from now and do some math with the seconds to get years
	// converting to int rounds the float64 down to a whole number
	return int(time.Now().Sub(m.Birthday).Seconds() / 31556952)
}

func (m MeConfig) GithubLink() string {
	return "https://github.com/" + m.Github
}

func (m MeConfig) TwitterLink() string {
	return "https://twitter.com/" + m.Twitter
}

func (m MessagesConfig) RandomMessage(key int) string {
	messages := m[key]
	switch lenMessages := len(messages); lenMessages {
	case 0:
		return "oops?"
	default:
		index := rand.Intn(lenMessages)
		return messages[index]
	}
}

func init() {
	rand.Seed(time.Now().Unix())
}
