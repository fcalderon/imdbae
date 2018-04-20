defmodule ImdbaeWeb.MatchController do
  use ImdbaeWeb, :controller

  alias Imdbae.Social
  alias Imdbae.Social.Match

  action_fallback ImdbaeWeb.FallbackController

  def index(conn, _params) do
    if (Map.has_key?(Map.get(conn, :assigns), :authenticated_user_id)) do
      userId = Map.get(_params, "userId")
      matchedWithUserId = Map.get(_params, "matchedWithUserId")

      matches = []

      if (userId != nil) do
        if (matchedWithUserId != nil) do
          matches = Social.list_matches_by_first_and_second_user_id(userId, matchedWithUserId)
        else
          matches = Social.list_matches_by_first_user_id(userId)
        end
      else
        matches = Social.list_matches()
      end

      render(conn, "index.json", matches: matches)
    else
      conn
      |> send_resp(:unauthorized, "Must be logged in to access this resource")
    end
  end

  def create(conn, %{"match" => match_params}) do
    # This should not be accessed via API

    with {:ok, %Match{} = match} <- Social.create_match(match_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", match_path(conn, :show, match))
      |> render("show.json", match: match)
    end
  end

  def show(conn, %{"id" => id}) do
    # TODO auth
    match = Social.get_match!(id)
    render(conn, "show.json", match: match)
  end

  def update(conn, %{"id" => id, "match" => match_params}) do
    # Should not be accessed via API
    match = Social.get_match!(id)

    with {:ok, %Match{} = match} <- Social.update_match(match, match_params) do
      render(conn, "show.json", match: match)
    end
  end

  def delete(conn, %{"id" => id}) do
    # Should not be accessed via API
    match = Social.get_match!(id)
    with {:ok, %Match{}} <- Social.delete_match(match) do
      send_resp(conn, :no_content, "")
    end
  end
end
