#Adapted from Let's Build a Slack Clone with Elixir, Phoenix,
# and React (part 4-- Creating Chat Rooms)

defmodule ImdbaeWeb.RoomController do
  use ImdbaeWeb, :controller

  alias Imdbae.Chats
  alias Imdbae.Chats.Room
  alias Imdbae.Repo

  action_fallback ImdbaeWeb.FallbackController

  def index(conn, _params) do
    rooms = Chats.list_rooms()
    render(conn, "index.json", rooms: rooms)
  end

  def create(conn, params) do
    current_user = fetch_session(conn, :current_user)
    changeset = Room.changeset(%Room{}, params)

    case Repo.insert(changeset) do
      {:ok, room} -> 
        assoc_changeset = Chats.Room.changeset(
          %Chats.Room{},
          %{user_id: current_user.id, room_id: room.id}
        )
        Repo.insert(assoc_changeset)

        conn
        |> put_status(:created)
        |> render("show.json", room: room)
        {:error, changeset} ->
          conn
            |> put_status(:unprocessable_entity)
            |> render(Chats.ChangesetView, "error.json", changeset: changeset)
    end
  end


  def join(conn, %{"id" => room_id}) do
    current_user = fetch_session(conn, :current_user)
    room = Repo.get(Room, room_id)

    changeset = Chats.Room.changeset(
      %Chats.Room{},
      %{room_id: room.id, user_id: current_user.id}
    )

    case Repo.insert(changeset) do
      {:ok, _room} ->
        conn
        |> put_status(:created)
        |> render("show.json", %{room: room})
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Chats.ChangesetView, "error.json", changeset: changeset)
    end
  end

end
