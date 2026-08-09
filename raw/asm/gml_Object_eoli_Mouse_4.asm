// gml_Object_eoli_Mouse_4  locals=2 args=0 len=408
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20F5D08
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 11
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20F5D08
00000054: b 0x20F5D10
00000058: popenv 0x40F5CCC
0000005C: b 0x20F5D14
00000060: popenv 0x1CF5D10
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20F5E34
00000074: push.imm.e 156
00000078: pushenv 0x20F5D6C
0000007C: push.imm.e 4
00000080: conv.i.v
00000084: push.i 200000
0000008C: conv.i.v
00000090: push.v mon
00000098: call action_if_variable(argc=3)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x20F5D6C
000000B8: b 0x20F5D74
000000BC: popenv 0x40F5D2C
000000C0: b 0x20F5D78
000000C4: popenv 0x1CF5D74
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20F5E34
000000D8: push.imm.e 0
000000DC: conv.i.v
000000E0: push.imm.e 0
000000E4: conv.i.v
000000E8: push.imm.e 127
000000EC: conv.i.v
000000F0: call action_if_number(argc=3)
000000F8: pop.v.v local.__b__
00000100: push.local.v local.__b__
00000108: conv.v.b
0000010C: bf 0x20F5E34
00000110: push.imm.e 1
00000114: pop.v.i redder
0000011C: push.imm.e 1
00000120: conv.i.v
00000124: call action_set_relative(argc=1)
0000012C: popz
00000130: push.imm.e 0
00000134: conv.i.v
00000138: push.imm.e 0
0000013C: conv.i.v
00000140: push.imm.e 127
00000144: conv.i.v
00000148: call action_create_object(argc=3)
00000150: popz
00000154: push.imm.e 0
00000158: conv.i.v
0000015C: call action_set_relative(argc=1)
00000164: popz
00000168: push.imm.e 9
0000016C: conv.i.v
00000170: push.imm.e 2
00000174: conv.i.v
00000178: call action_set_alarm(argc=2)
00000180: popz
00000184: push.imm.e 0
00000188: conv.i.v
0000018C: call action_set_relative(argc=1)
00000194: popz