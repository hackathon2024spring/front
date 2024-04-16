初期フォルダ構成
.
├── .devcontainer
│ └── devcontainer.json
├── .env
├── .gitignore
├── Dockerfile
├── README.md
├── build.sh
├── docker-compose.yml
├── docker_softclear.sh
├── index.css
└── tailwind.config.js

docker system prune -a

このコマンドは既存の docker 環境を完全に削除し、改めて image から作り直す必要があるが
たまに実行した方がいいです。

私の SSD は 85GB も開放されました w
