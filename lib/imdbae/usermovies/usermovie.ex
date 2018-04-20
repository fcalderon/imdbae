defmodule  Imdbae.Usermovies.Usermovie do
  use Ecto.Schema
  import Ecto.Changeset


  schema "usermovies" do
    field :movie_id, :integer
    field :user_id, :id
    field :title, :string
    field :poster_url, :string

    timestamps()
  end

  @doc false
  def changeset(usermovie, attrs) do
    usermovie
    |> cast(attrs, [:movie_id, :user_id, :title, :poster_url])
    |> validate_required([:movie_id, :user_id, :title])
  end
end
