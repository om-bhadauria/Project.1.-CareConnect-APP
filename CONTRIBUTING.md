# Contributing

Thank you for your interest in improving CareConnect.

## How to Contribute

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

3. Make focused changes.
4. Run checks before opening a pull request:

```bash
npm install
npm run typecheck
npm run build
```

5. Open a pull request with a clear summary and screenshots for UI changes.

## Pull Request Guidelines

- Keep PRs small and easy to review.
- Do not commit secrets or `.env` files.
- Keep generated folders such as `node_modules`, `.next`, `dist`, and `build` out of Git.
- Describe what changed, why it changed, and how it was tested.
