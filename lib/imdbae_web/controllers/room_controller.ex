defmodule ImdbaeWeb.RoomController do
  use ImdbaeWeb, :controller

  alias Imdbae.Chats
  alias Imdbae.Chats.Room

  action_fallback ImdbaeWeb.FallbackController

  def index(conn, _params) do
    rooms = Chats.list_rooms()
    render(conn, "index.json", rooms: rooms)
  end

  def create(conn, params) do
    with {:ok, %Room{} = room} <- Chats.create_room(room_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", room_path(conn, :show, room))
      |> render("show.json", room: room)
    end
  end

  def show(conn, %{"id" => id}) do
    room = Chats.get_room!(id)
    render(conn, "show.json", room: room)
  end

  def update(conn, %{"id" => id, "room" => room_params}) do
    room = Chats.get_room!(id)

    with {:ok, %Room{} = room} <- Chats.update_room(room, room_params) do
      render(conn, "show.json", room: room)
    end
  end

  def delete(conn, %{"id" => id}) do
    room = Chats.get_room!(id)
    with {:ok, %Room{}} <- Chats.delete_room(room) do
      send_resp(conn, :no_content, "")
    end
  end
end
