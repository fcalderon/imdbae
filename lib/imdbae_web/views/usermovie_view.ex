defmodule ImdbaeWeb.UsermovieView do
  use ImdbaeWeb, :view
  alias ImdbaeWeb.UsermovieView

  def render("index.json", %{usermovies: usermovies}) do
    %{data: render_many(usermovies, UsermovieView, "usermovie.json")}
  end

  def render("show.json", %{usermovie: usermovie}) do
    %{data: render_one(usermovie, UsermovieView, "usermovie.json")}
  end

  def render("usermovie.json", %{usermovie: usermovie}) do
    %{
      id: usermovie.id,
      movie_id: usermovie.movie_id,
      user_id: usermovie.user_id,
      title: usermovie.title
    }
  end
end
