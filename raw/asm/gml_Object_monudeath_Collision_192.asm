// gml_Object_monudeath_Collision_192  locals=2 args=0 len=116
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1
0000000C: conv.i.v
00000010: push.v arm
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x2104C28
00000038: push.v other.id
00000040: conv.v.i
00000044: pushenv 0x2104C08
00000048: call action_kill_object(argc=0)
00000050: popz
00000054: popenv 0x4104BFC
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: push.imm.e 1
00000064: conv.i.v
00000068: call action_set_alarm(argc=2)
00000070: popz