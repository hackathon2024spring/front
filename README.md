- 最小限フォルダ構成 ($ tree -a -I '.git')
  .
  ├── .devcontainer
  │ └── devcontainer.json
  ├── .gitignore
  ├── App.css・・・react-app に送る ルートコンポーネント用 css
  ├── App.tsx・・・react-app に送る ルートコンポーネント
  ├── Dockerfile
  ├── README.md
  ├── build.sh ・・・docker-compose.yml の commands で実行されるシェルスクリプト
  ├── docker-compose.yml
  ├── docker_softclear.sh・・・image 以外を残して docker コンテナを停止 → 削除
  ├── index.css・・・react-app に送る global の css
  └── tailwind.config.js・・・react-app に送る tailwind 設定ファイル。デジタル庁のデザインシステムの色を登録済

- .env は GitHub にプッシュされていないので、何らかの方法で入手してください。ローカルの UID、GID と一致させる必要があります。
- このプロジェクトをコピーして react-app フォルダを削除し、最小限フォルダに戻せば、新たに react-app を作れます。
- docker-compose.yml を右クリック →compose up で各 docker コンテナが生成。react-app を新設するとかなり時間がかかる。
- クジラアイコン → 緑三角形を右クリック →Attach Shell で コンテナに CLI で入れる。
- package.json のあるフォルダで yarn dev で開発用サーバーが起動。
- VSCode の左下><を左クリック →Reopen in container で docker コンテナに GUI で入れる。
- ローカルにおけるプロジェクトのルートフォルダを docker コンテナに volumes で繋いでいるので、docker コンテナ内でファイルを更新するとローカルのファイルも更新される。
- git clone を実行した直後、react-app フォルダは存在するが node_modules フォルダは無いので、初回の compose up は非常に時間がかかる。クジラアイコン → 緑三角を右クリック →View logs でコンテナ生成の進捗を確認できる。
  − コンテナ内で yarn add hoge を実行すると git で監視された package.json が更新される。しかし build.sh も更新しないと、流用する際にインストールされない。最初の package.json は build.sh が作るため。
- docker system prune -a
  このコマンドは既存の docker 環境を完全に削除し、改めて image から作り直す必要があるが
  たまに実行した方が良い。
- nodejs のバンドラー vite のデフォルトのポートは 5173。フランス語で vite を「VI7ε」と書くかららしい。
