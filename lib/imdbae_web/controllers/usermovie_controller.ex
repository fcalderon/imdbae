defmodule ImdbaeWeb.UsermovieController do
  use ImdbaeWeb, :controller

  alias Imdbae.Usermovies
  alias Imdbae.Usermovies.Usermovie

  action_fallback ImdbaeWeb.FallbackController

  def index(conn, _params) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      userId = Map.get(_params, "userId")

      usermovies = []

      if (userId != nil) do
        usermovies = Usermovies.list_usermovies_by_user_id(userId)
      else
        usermovies = Usermovies.list_usermovies()
      end
      render(conn, "index.json", usermovies: usermovies)
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def create(conn, %{"usermovie" => usermovie_params}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      # TODO when a usermovie is created, find and update all matches associated with the added usermovie
      with {:ok, %Usermovie{} = usermovie} <- Usermovies.create_usermovie(usermovie_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", usermovie_path(conn, :show, usermovie))
        |> render("show.json", usermovie: usermovie)
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def show(conn, %{"id" => id}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      usermovie = Usermovies.get_usermovie!(id)
      render(conn, "show.json", usermovie: usermovie)
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def update(conn, %{"id" => id, "usermovie" => usermovie_params}) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      usermovie = Usermovies.get_usermovie!(id)

      with {:ok, %Usermovie{} = usermovie} <- Usermovies.update_usermovie(usermovie, usermovie_params) do
        render(conn, "show.json", usermovie: usermovie)
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def delete(conn, %{"id" => id}) do
    # TODO when a usermovie is deleted, find and update/remove all matches associated with the deleleted usermovie
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      usermovie = Usermovies.get_usermovie!(id)
      with {:ok, %Usermovie{}} <- Usermovies.delete_usermovie(usermovie) do
        send_resp(conn, :no_content, "")
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end
end
