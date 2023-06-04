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

func (repository Repository) CreateEvent(userId string, eventData model.Event) (*model.Event, error) {
	collection := repository.client.Database("register").Collection("event")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := collection.InsertOne(ctx, eventData)
	if err != nil {
		return nil, err
	}

	event, err := repository.GetEvent(userId, eventData.ID)
	if err != nil {
		return nil, err
	}

	return event, nil
}

func (repository Repository) GetEvents(userId string) ([]model.Event, error) {
	collection := repository.client.Database("register").Collection("event")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"userId": userId}
	options := options.Find()
	options.SetSort(bson.M{"_id": -1})

	cur, err := collection.Find(ctx, filter, options)
	if err != nil {
		return nil, err
	}

	entities := []model.Event{}

	for cur.Next(ctx) {

		entity := model.Event{}
		err := cur.Decode(&entity)
		if err != nil {
			log.Fatal(err)
		}
		entities = append(entities, entity)
	}

	if err != nil {
		return nil, err
	}
	return entities, nil
}

func (repository *Repository) GetEvent(userId, ID string) (*model.Event, error) {
	collection := repository.client.Database("register").Collection("event")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	entity := &model.Event{}
	filters := bson.M{"id": ID, "userId": userId}
	err := collection.FindOne(ctx, filters).Decode(entity)
	if err != nil {
		return nil, err
	}

	return entity, nil
}

func (repository *Repository) DeleteEvent(userId, ID string) error {
	collection := repository.client.Database("register").Collection("event")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	deleteEvent := collection.FindOneAndDelete(ctx, bson.M{"id": ID, "userId": userId})

	if deleteEvent != nil {
		return deleteEvent.Err()
	}

	return nil
}
