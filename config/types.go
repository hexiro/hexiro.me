package config

import "time"

// the name here is horrible
// lmk if you have any ideas

type FullConfig struct {
	Server   ServerConfig   `yaml:"server"`
	Me       MeConfig       `yaml:"me"`
	Messages MessagesConfig `yaml:"messages"`
}

type ServerConfig struct {
	Port       string `yaml:"port"`
	Production bool   `envconfig:"PRODUCTION"`
}

type MeConfig struct {
	Github   string    `yaml:"github"`
	Twitter  string    `yaml:"twitter"`
	Birthday time.Time `yaml:"birthday"`
}

type MessagesConfig map[int][]string
