defmodule Imdbae.Social.Match do
  use Ecto.Schema
  import Ecto.Changeset


  schema "matches" do
    field :email1, :string
    field :email2, :string

    timestamps()
  end

  @doc false
  def changeset(match, attrs) do
    match
    |> cast(attrs, [:email1, :email2])
    |> validate_required([:email1, :email2])
  end
end
