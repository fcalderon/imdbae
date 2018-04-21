#From Let's Build a Slack Clone on Medium

defmodule Imdbae.Chats.Userroom do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user_rooms" do
    belongs_to :user, Imdbae.Accounts.User
    belongs_to :room, Imdbae.Chats.Room

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :room_id])
    |> validate_required([:user_id, :room_id])
    |> unique_constraint(:user_id_room_id)
  end
end

