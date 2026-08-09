/// gml_Object_iconic_Step_0
// locals: __b__
action_move_to(view_xview[0], view_yview[0] + 20 * global.sca + global.upp);
__b__ = action_if_variable(easy, 0, 0);
if (__b__) {
    __b__ = action_if_variable(over, 0, 0);
    if (__b__) {
        with (r12) {
            __b__ = action_if_variable(oil, 0, 3);
            if (__b__) {
                break;
            }
        }
        if (__b__) {
            __b__ = action_if_variable(de, 0, 0);
            if (__b__) {
                with (scroller2) {
                    goer = 0;
                }
                action_sprite_set(empty2, 0, 1);
                action_set_alarm(300, 1);
                de = 1;
            }
        }
    }
}
with (chies) {
    __b__ = action_if_variable(life, 0, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(over, 0, 0);
    if (__b__) {
        over = 1;
        action_set_alarm(900, 2);
    }
}
action_sprite_transform(global.sca, global.sca, 0, 0);
