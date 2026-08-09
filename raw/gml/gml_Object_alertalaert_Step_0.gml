/// gml_Object_alertalaert_Step_0
// locals: __b__
action_sprite_transform(global.sca, global.sca, 0, 0);
action_move_to(view_xview[0] + view_wview[0] / 2, view_yview[0] + view_hview[0] / 2);
with (r12) {
    __b__ = action_if_variable(oil, 1000, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        allerta = 0;
    }
    action_kill_object();
}
