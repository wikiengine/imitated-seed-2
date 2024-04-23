//"/", "/w", "/w/"로 접속시 대문으로 이동

export default function ({ route, redirect }) {
    var frontpage = "frontpage" //추후 config.json에서 불러올 예정
    if (route.path === '/w' ||  route.path === '/' ||  route.path === '/w/') {
        return redirect(`/w/${frontpage}`);
    }
}