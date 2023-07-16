terraform {
  backend "s3" {
    endpoint                = "fra1.digitaloceanspaces.com"
    key                     = "terraform.tfstate"
    bucket                  = "terraformstatesaves"
    region                  = "us-west-1"
    skip_requesting_account_id = true
    skip_credentials_validation = true
    skip_get_ec2_platforms = true
    skip_metadata_api_check = true
  }
}

resource "digitalocean_app" "gamer-news" {
  spec {
    name   = "gamer-news"
    region = "fra"

    env {
      key   = "TELEGRAM_TOKEN"
      value = var.telegram_token
    }

    service {
      name               = "gamer-news"
      instance_count     = 1
      instance_size_slug = "basic-xxs"

      image {
        registry_type = "DOCR"
        repository    = "gamer-news"
        tag           = "latest"
      }
    }
  }
}