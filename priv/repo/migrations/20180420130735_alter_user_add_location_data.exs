defmodule Imdbae.Repo.Migrations.AlterUserAddLocationData do
  use Ecto.Migration

  def change do
    alter table("users") do
      add :loc_lon, :float
      add :loc_lat, :float
      add :distance, :integer
    end
  end
end
