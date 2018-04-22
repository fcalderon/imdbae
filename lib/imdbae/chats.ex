defmodule Imdbae.UserRooms do
  use Ecto.Schema
  import Ecto.Changeset


  schema "userroom" do
    field :user_rooms, :string
    field :user_id, :id
    field :room_id, :id

    timestamps()
  end

  @doc false
  def changeset(chats, attrs) do
    chats
    |> cast(attrs, [:user_rooms])
    |> validate_required([:user_rooms])
  end
end
