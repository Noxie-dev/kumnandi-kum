FROM node:22-bookworm

ARG USERNAME=node

ENV PNPM_HOME=/home/${USERNAME}/.local/share/pnpm
ENV PATH=${PNPM_HOME}:${PATH}
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    git \
    openssh-client \
    sudo \
    zsh \
  && echo "${USERNAME} ALL=(root) NOPASSWD:ALL" > /etc/sudoers.d/${USERNAME} \
  && chmod 0440 /etc/sudoers.d/${USERNAME} \
  && mkdir -p ${PNPM_HOME}/store \
  && corepack enable \
  && corepack prepare pnpm@10.4.1 --activate \
  && chown -R ${USERNAME}:${USERNAME} /home/${USERNAME}/.local \
  && rm -rf /var/lib/apt/lists/*

USER ${USERNAME}
