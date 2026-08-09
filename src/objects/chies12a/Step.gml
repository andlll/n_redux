/// gml_Object_chies12a_Step_0
// locals: __b__
action_sprite_transform(global.sca * 0.5, global.sca * 0.5, 0, 0);
with (chies) {
    __b__ = action_if_variable(level, 1, 0);
    if (!__b__) {
        break;
    }
}
if (!__b__) {
    action_kill_object();
}
