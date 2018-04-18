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
      email1: match.email1,
      email2: match.email2}
  end
end
