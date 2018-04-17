defmodule ImdbaeWeb.MatchController do
  use ImdbaeWeb, :controller

  alias Imdbae.Social
  alias Imdbae.Social.Match

  action_fallback ImdbaeWeb.FallbackController

  def index(conn, _params) do
    matches = Social.list_matches()
    render(conn, "index.json", matches: matches)
  end

  def create(conn, %{"match" => match_params}) do
    with {:ok, %Match{} = match} <- Social.create_match(match_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", match_path(conn, :show, match))
      |> render("show.json", match: match)
    end
  end

  def show(conn, %{"id" => id}) do
    match = Social.get_match!(id)
    render(conn, "show.json", match: match)
  end

  def update(conn, %{"id" => id, "match" => match_params}) do
    match = Social.get_match!(id)

    with {:ok, %Match{} = match} <- Social.update_match(match, match_params) do
      render(conn, "show.json", match: match)
    end
  end

  def delete(conn, %{"id" => id}) do
    match = Social.get_match!(id)
    with {:ok, %Match{}} <- Social.delete_match(match) do
      send_resp(conn, :no_content, "")
    end
  end
end
