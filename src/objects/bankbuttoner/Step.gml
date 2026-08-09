/// gml_Object_bankbuttoner_Step_0
// locals: __b__
__b__ = action_if_number(736, 0, 0);
if (__b__) {
    __b__ = action_if_number(291, 0, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(dara, 0, 0);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            with (r12) {
                __b__ = action_if_variable(oil, 0, 3);
                if (__b__) {
                    break;
                }
            }
            if (__b__) {
                action_kill_object();
            }
        }
    }
}
action_sprite_transform(global.sca, global.sca, 0, 0);
__b__ = action_if_number(150, 1, 0);
if (__b__) {
    action_sprite_color(16777215, 0);
} else {
    __b__ = action_if_variable(loaned, 0, 0);
    if (__b__) {
        action_sprite_color(16777215, 0.6);
    }
    __b__ = action_if_variable(loaned, 1, 0);
    if (__b__) {
        action_sprite_color(16777215, 0.2);
    }
}
