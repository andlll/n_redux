/// gml_Object_wavesig1_Step_0
// locals: __b__
action_sprite_transform(global.sca, global.sca, 0, 0);
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (!__b__) {
        break;
    }
}
if (!__b__) {
    action_sprite_color(16777215, 0.3);
}
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    action_sprite_color(16777215, 1);
}
