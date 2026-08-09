/// gml_Object_d113_Step_0
// locals: __b__
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(ele, 0, 3);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_variable(trans, 1, 0);
        if (__b__) {
            action_sprite_set(empty2, 0, 1);
            bout = 1;
        }
    }
}
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(ele, 0, 4);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        __b__ = action_if_variable(trans, 0, 0);
        if (__b__) {
            action_sprite_set(c113x, 84, -1);
            action_set_alarm(85, 0);
            trans = 1;
        }
    }
}
with (aura) {
    __b__ = action_if_variable(night, 0, 0);
    if (__b__) {
        break;
    }
}
if (__b__) {
    __b__ = action_if_variable(trans, 1, 0);
    if (__b__) {
        __b__ = action_if_variable(bout, 0, 0);
        if (__b__) {
            action_sprite_set(c113x, 0, 1);
        }
        action_set_alarm(86, 1);
        trans = 0;
        bout = 0;
    }
}
