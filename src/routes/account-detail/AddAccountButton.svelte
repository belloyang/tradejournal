<script>
    import { page } from '$app/stores';
</script>

<div aria-current={$page.url.pathname === '/account-detail' ? 'page' : undefined}>
    <button style="padding: 10px;"><a href="/account-detail">Add an Account</a></button>
</div>