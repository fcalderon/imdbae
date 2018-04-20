defmodule Imdbae.Chats.Room do
  use Ecto.Schema
  import Ecto.Changeset


  schema "rooms" do
    field :name, :string
    field :topic, :string
    many_to_many :users, Imdbae.Accounts.User, join_through: "userrooms"

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:name, :topic])
    |> validate_required([:name, :topic])
    |> unique_constraint(:name)
  end
end
