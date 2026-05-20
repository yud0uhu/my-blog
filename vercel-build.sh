curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
source "/rust/env" 2>/dev/null || source "$HOME/.cargo/env" 2>/dev/null || source "/root/.cargo/env" 2>/dev/null || true
rustup target add wasm32-unknown-unknown
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh -s -- -y
npx prisma generate
npm run build:wasm && npm run build:next
