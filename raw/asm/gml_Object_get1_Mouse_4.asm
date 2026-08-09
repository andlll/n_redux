// gml_Object_get1_Mouse_4  locals=2 args=0 len=352
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x21E9BA0
0000001C: push.imm.e 4
00000020: conv.i.v
00000024: push.imm.e 2000
00000028: conv.i.v
0000002C: push.v mon
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x21E9BA0
00000054: b 0x21E9BA8
00000058: popenv 0x41E9B64
0000005C: b 0x21E9BAC
00000060: popenv 0x1DE9BA8
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x21E9C94
00000074: push.imm.e 156
00000078: pushenv 0x21E9BDC
0000007C: push.v mon
00000084: push.imm.e -2000
00000088: add.i.v
0000008C: pop.v.v mon
00000094: popenv 0x41E9BC4
00000098: push.imm.e 131
0000009C: pushenv 0x21E9C1C
000000A0: push.imm.e 0
000000A4: conv.i.v
000000A8: call action_set_relative(argc=1)
000000B0: popz
000000B4: push.imm.e 0
000000B8: pop.v.i active
000000C0: push.imm.e 1
000000C4: conv.i.v
000000C8: call action_set_relative(argc=1)
000000D0: popz
000000D4: popenv 0x41E9BE8
000000D8: push.imm.e 131
000000DC: pushenv 0x21E9C6C
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: call action_set_relative(argc=1)
000000F0: popz
000000F4: push.imm.e 2
000000F8: conv.i.v
000000FC: push.imm.e 400
00000100: conv.i.v
00000104: call action_set_alarm(argc=2)
0000010C: popz
00000110: push.imm.e 1
00000114: conv.i.v
00000118: call action_set_relative(argc=1)
00000120: popz
00000124: popenv 0x41E9C28
00000128: push.imm.e 156
0000012C: pushenv 0x21E9C90
00000130: push.v oil
00000138: push.imm.e 1000
0000013C: add.i.v
00000140: pop.v.v oil
00000148: popenv 0x41E9C78
0000014C: push.imm.e 0
00000150: conv.i.v
00000154: call action_set_relative(argc=1)
0000015C: popz