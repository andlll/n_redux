// gml_Object_moto2a_Step_0  locals=2 args=0 len=108
// locals: arguments, __b__
00000000: push.imm.e 156
00000004: pushenv 0x20CB530
00000008: push.imm.e 3
0000000C: conv.i.v
00000010: push.imm.e 0
00000014: conv.i.v
00000018: push.v oil
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x20CB530
00000040: b 0x20CB538
00000044: popenv 0x40CB4F4
00000048: b 0x20CB53C
0000004C: popenv 0x1CCB538
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20CB558
00000060: call action_kill_object(argc=0)
00000068: popz