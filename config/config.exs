# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :imdbae,
  ecto_repos: [Imdbae.Repo]

# Configures the endpoint
config :imdbae, ImdbaeWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "3Vw6FaLkiIpFIMXVNs3G+gpdAVW+g4drluA7jvlXHfiO16w8vsuj//OSG9Zlhdyl",
  render_errors: [view: ImdbaeWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Imdbae.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

# You can use pwgen for this key
# e.g. $ pwgen 32 1 -s -y
config :imdbae, app_salt: "ffrJBykjhg!cqv+{qm*>D_]2!K%_BiZX,GqeOllkuhkl"

config :google_maps,
       api_key: "AIzaSyD9ibjyQr-D535en8QPCgshM_Bl5dkClDY"