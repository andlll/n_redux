/// gml_Object_placeholder_Mouse_56
// locals: __b__
with (placeholder) {
    scrolling = 0;
}
__b__ = action_if_variable(making, 1, 0);
if (__b__) {
    __b__ = action_if_variable(ult, 0, 0);
    if (__b__) {
        making = 0;
        action_sprite_set(empty, 0, 1);
        action_sprite_color(16777215, 1);
        with (dir1) {
            action_kill_object();
        }
        with (dir2) {
            action_kill_object();
        }
        with (dir3) {
            action_kill_object();
        }
        with (dir4) {
            action_kill_object();
        }
    }
}
__b__ = action_if_variable(making, 2, 0);
if (__b__) {
    __b__ = action_if_variable(ult, 0, 0);
    if (__b__) {
        making = 0;
        action_sprite_set(empty, 0, 1);
        action_sprite_color(16777215, 1);
        with (dir1) {
            action_kill_object();
        }
        with (dir2) {
            action_kill_object();
        }
        with (dir3) {
            action_kill_object();
        }
        with (dir4) {
            action_kill_object();
        }
    }
}
