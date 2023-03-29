package main

import (
	"context"
	"log"
	"time"

	model "example.com/greetings/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Repository struct {
	client *mongo.Client
}

func NewRepository() *Repository {
	uri := "mongodb+srv://haticeakyel:test@cluster.nhd45gm.mongodb.net/test"
	client, err := mongo.NewClient(options.Client().ApplyURI(uri))
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)

	defer cancel()
	client.Connect(ctx)

	if err != nil {
		log.Fatal(err)
	}

	return &Repository{client}
}

func (repository Repository) PostRegister(userRegister model.User) error {
	collection := repository.client.Database("register").Collection("register")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, userRegister)

	if err != nil {
		return err
	}
	return nil
}

func (repository Repository) GetUser(email string) (model.User, error) {
	collection := repository.client.Database("register").Collection("register")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	user := model.User{}
	err := collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	

	if err != nil {
		log.Fatal(err)
	}
	return user, nil
}
