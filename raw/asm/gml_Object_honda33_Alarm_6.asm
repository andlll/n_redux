// gml_Object_honda33_Alarm_6  locals=2 args=0 len=144
// locals: arguments, __b__
00000000: push.imm.e 156
00000004: pushenv 0x20A4620
00000008: push.imm.e 2
0000000C: conv.i.v
00000010: push.imm.e 0
00000014: conv.i.v
00000018: push.v oil
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x20A4620
00000040: b 0x20A4628
00000044: popenv 0x40A45E4
00000048: b 0x20A462C
0000004C: popenv 0x1CA4628
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20A4660
00000060: push.imm.e 755
00000064: conv.i.v
00000068: push.imm.e 2417
0000006C: conv.i.v
00000070: push.imm.e 40
00000074: conv.i.v
00000078: call action_create_object(argc=3)
00000080: popz
00000084: call action_kill_object(argc=0)
0000008C: popz