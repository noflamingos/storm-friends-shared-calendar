# Storm Friends Shared Calendar

A combined, mobile-friendly calendar for Storm U10 AA and Storm U12 A.

## Publish it
1. Create a new **public** GitHub repository (suggested name: `storm-friends-shared-calendar`).
2. Upload all files and folders from this project, including `.github` and `.nojekyll`.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment → Source**, select **GitHub Actions**.
5. Open **Actions → Update hockey calendar and deploy → Run workflow** once, or push a commit.
6. After the workflow succeeds, the Pages URL appears in **Settings → Pages**.

The workflow refreshes both WebCal feeds hourly and deploys the latest schedule without committing generated calendar data back to the repository.

## Teams
- Storm U10 AA — `#45dbe6`
- Storm U12 A — `#004e8a`
