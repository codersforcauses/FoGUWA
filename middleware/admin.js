export default function({ app, redirect }) {
  if (!app.store.getters['user/isAdmin']) {
    return redirect('/');
  }
}