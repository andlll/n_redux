/// gml_Object_dockersig3_Step_0
// locals: __b__
action_sprite_transform(global.sca, global.sca, 0, 0);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (!__b__) {
        break;
    }
}
if (!__b__) {
    __b__ = action_if_variable(active, 0, 0);
    if (__b__) {
        action_kill_object();
    }
}
