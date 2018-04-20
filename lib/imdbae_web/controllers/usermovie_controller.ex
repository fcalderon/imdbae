defmodule ImdbaeWeb.UsermovieController do
  use ImdbaeWeb, :controller

  alias Imdbae.Usermovies
  alias Imdbae.Usermovies.Usermovie
  alias ImdbaeWeb.MatchController

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
      with {:ok, %Usermovie{} = usermovie} <- Usermovies.create_usermovie(usermovie_params) do

        update_new_matches(usermovie)

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

  def update_new_matches(usermovie) do
    other_usermovies = Usermovies.list_usermovies_by_movie_id(usermovie.movie_id)
    Enum.each(other_usermovies, fn (other_usermovie) -> save_match(usermovie, other_usermovie)  end)
  end

  defp save_match(usermovie, other_usermovie) do
    # Save the match for both sides

    Imdbae.Social.create_match(
      %{
        first_user_id: usermovie.user_id,
        second_user_id: other_usermovie.user_id,
        matched_on_first_usermovie_id: usermovie.id,
        matched_on_second_usermovie_id: other_usermovie.id,
        matched_on_movie_id: usermovie.movie_id,
        matched_on_movie_title: usermovie.title,
        matched_on_movie_poster_url: usermovie.poster_url
      }
    )

    Imdbae.Social.create_match(
      %{
        first_user_id: other_usermovie.user_id,
        second_user_id: usermovie.user_id,
        matched_on_first_usermovie_id: other_usermovie.id,
        matched_on_second_usermovie_id: usermovie.id,
        matched_on_movie_id: usermovie.movie_id,
        matched_on_movie_title: usermovie.title,
        matched_on_movie_poster_url: usermovie.poster_url
      }
    )
  end

  def remove_outdated_matches(removedUsermovie) do
    other_matches = Imdbae.Social
    .list_matches_by_first_user_id_and_movie_id(removedUsermovie.user_id, removedUsermovie.movie_id)
    Enum.each(
      other_matches,
      fn (match) ->
        Imdbae.Social.delete_match(match)
      end
    )
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
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      usermovie = Usermovies.get_usermovie!(id)
      # Delete all the matches related to this usermovie before deleting the movie
      remove_outdated_matches(usermovie)
      with {:ok, %Usermovie{}} <- Usermovies.delete_usermovie(usermovie) do
        send_resp(conn, :no_content, "")
      end
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end
end
