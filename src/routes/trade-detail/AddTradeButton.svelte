<script>
    import { page } from '$app/stores';
</script>

<div aria-current={$page.url.pathname === '/trade-detail' ? 'page' : undefined}>
    <button style="padding: 10px;"><a href="/trade-detail">Add a Trade</a></button>
</div>