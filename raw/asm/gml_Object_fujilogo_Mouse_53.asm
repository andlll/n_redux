// gml_Object_fujilogo_Mouse_53  locals=2 args=0 len=132
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.v going
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x21105B8
00000038: push.imm.e 1
0000003C: conv.i.v
00000040: push.imm.e 30
00000044: conv.i.v
00000048: call action_set_alarm(argc=2)
00000050: popz
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 717
00000068: conv.i.v
0000006C: call action_create_object(argc=3)
00000074: popz
00000078: push.imm.e 1
0000007C: pop.v.i going