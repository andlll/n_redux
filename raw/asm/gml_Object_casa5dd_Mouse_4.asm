// gml_Object_casa5dd_Mouse_4  locals=2 args=0 len=436
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 156
00000018: pushenv 0x20E4FC4
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 11
00000028: conv.i.v
0000002C: push.v selec
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x20E4FC4
00000054: b 0x20E4FCC
00000058: popenv 0x40E4F88
0000005C: b 0x20E4FD0
00000060: popenv 0x1CE4FCC
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x20E510C
00000074: push.imm.e 156
00000078: pushenv 0x20E5028
0000007C: push.imm.e 4
00000080: conv.i.v
00000084: push.i 50000
0000008C: conv.i.v
00000090: push.v mon
00000098: call action_if_variable(argc=3)
000000A0: pop.v.v local.__b__
000000A8: push.local.v local.__b__
000000B0: conv.v.b
000000B4: bf 0x20E5028
000000B8: b 0x20E5030
000000BC: popenv 0x40E4FE8
000000C0: b 0x20E5034
000000C4: popenv 0x1CE5030
000000C8: push.local.v local.__b__
000000D0: conv.v.b
000000D4: bf 0x20E510C
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
0000010C: bf 0x20E510C
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
00000184: push.imm.e 1
00000188: conv.i.v
0000018C: push.imm.e 255
00000190: conv.i.v
00000194: call action_sprite_color(argc=2)
0000019C: popz
000001A0: push.imm.e 0
000001A4: conv.i.v
000001A8: call action_set_relative(argc=1)
000001B0: popz