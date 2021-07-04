package config

import (
	"strings"
	"time"
)

// the name here is horrible
// lmk if you have any ideas

type FullConfig struct {
	Server   ServerConfig   `yaml:"server"`
	Me       MeConfig       `yaml:"me"`
	Messages MessagesConfig `yaml:"messages"`
}

type ServerConfig struct {
	Port   string `yaml:"port"`
	Status string `envconfig:"STATUS" default:"Development"`
}

type MeConfig struct {
	Github   string    `yaml:"github"`
	Twitter  string    `yaml:"twitter"`
	Birthday time.Time `yaml:"birthday"`
}

type MessagesConfig map[int][]string

func (s ServerConfig) Development() bool {
	return strings.HasPrefix(strings.ToLower(s.Status), "dev")
}

func (s ServerConfig) Production() bool  {
	return !s.Development()
}

func (s *ServerConfig) EnableProduction() {
	s.Status = "Production"
}