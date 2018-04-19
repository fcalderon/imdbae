defmodule Imdbae.Social.Match do
  use Ecto.Schema
  import Ecto.Changeset


  schema "matches" do
    field :first_user_id, :integer
    field :second_user_id, :integer
    field :matched_on_first_usermovie_id, :integer
    field :matched_on_second_usermovie_id, :integer
    field :matched_on_movie_id, :integer
    field :matched_on_movie_title, :string
    field :matched_on_movie_poster_url, :string

    timestamps()
  end

  @doc false
  def changeset(match, attrs) do
    match
    |> cast(
         attrs,
         [
           :first_user_id,
           :second_user_id,
           :matched_on_first_usermovie_id,
           :matched_on_second_usermovie_id,
           :matched_on_movie_id,
           :matched_on_movie_title,
           :matched_on_movie_poster_url
         ]
       )
    |> validate_required(
         [
           :first_user_id,
           :second_user_id,
           :matched_on_first_usermovie_id,
           :matched_on_second_usermovie_id,
           :matched_on_movie_id,
           :matched_on_movie_title
         ]
       )
  end
end
