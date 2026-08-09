// gml_Object_farolux3_Step_0  locals=2 args=0 len=116
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x20B6654
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: not.b.d
00000040: bf 0x20B6654
00000044: b 0x20B665C
00000048: popenv 0x40B6614
0000004C: b 0x20B6660
00000050: popenv 0x1CB665C
00000054: push.local.v local.__b__
0000005C: conv.v.b
00000060: not.b.d
00000064: bf 0x20B6680
00000068: call action_kill_object(argc=0)
00000070: popz