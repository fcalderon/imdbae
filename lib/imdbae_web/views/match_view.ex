defmodule ImdbaeWeb.MatchView do
  use ImdbaeWeb, :view
  alias ImdbaeWeb.MatchView

  def render("index.json", %{matches: matches}) do
    %{data: render_many(matches, MatchView, "match.json")}
  end

  def render("show.json", %{match: match}) do
    %{data: render_one(match, MatchView, "match.json")}
  end

  def render("match.json", %{match: match}) do
    %{id: match.id,
      first_user_id: match.first_user_id,
      second_user_id: match.second_user_id,
      matched_on_first_usermovie_id: match.matched_on_first_usermovie_id,
      matched_on_second_usermovie_id: match.matched_on_second_usermovie_id,
      matched_on_movie_id: match.matched_on_movie_id,
      matched_on_movie_title: match.matched_on_movie_title,
      matched_on_movie_title: match.matched_on_movie_title,
      matched_on_movie_poster_url: match.matched_on_movie_poster_url
    }
  end
end
