// gml_Object_honda32a_Alarm_6  locals=2 args=0 len=144
// locals: arguments, __b__
00000000: push.imm.e 156
00000004: pushenv 0x20A3C7C
00000008: push.imm.e 2
0000000C: conv.i.v
00000010: push.imm.e 0
00000014: conv.i.v
00000018: push.v oil
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x20A3C7C
00000040: b 0x20A3C84
00000044: popenv 0x40A3C40
00000048: b 0x20A3C88
0000004C: popenv 0x1CA3C84
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20A3CBC
00000060: push.imm.e 565
00000064: conv.i.v
00000068: push.imm.e 2713
0000006C: conv.i.v
00000070: push.imm.e 38
00000074: conv.i.v
00000078: call action_create_object(argc=3)
00000080: popz
00000084: call action_kill_object(argc=0)
0000008C: popz