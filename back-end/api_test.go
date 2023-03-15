package main

import (
	"context"
	"time"
)

func GetCleanTestRepository() *Repository {

	repository := NewRepository()
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()
	companyDB := repository.client.Database("register")
	companyDB.Drop(ctx)

	return repository
}


