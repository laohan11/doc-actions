<template>
  <div class="min-h-full flex flex-col bg-gray-50">
    <header class="h-14 px-6 flex items-center justify-between bg-white shadow-sm">
      <span class="text-lg font-semibold text-gray-800">doc-actions</span>
      <nav class="flex gap-4 text-sm">
        <RouterLink to="/" class="text-gray-600 hover:text-blue-600">首页</RouterLink>
        <RouterLink to="/about" class="text-gray-600 hover:text-blue-600">关于</RouterLink>
      </nav>
    </header>

    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>
