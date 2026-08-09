// gml_Object_rocket_launcher_Create_0  locals=2 args=0 len=612
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: pop.v.i redder
00000020: push.imm.e 1
00000024: conv.i.v
00000028: call action_set_relative(argc=1)
00000030: popz
00000034: push.imm.e 0
00000038: conv.i.v
0000003C: push.imm.e 0
00000040: conv.i.v
00000044: push.imm.e 236
00000048: conv.i.v
0000004C: call action_create_object(argc=3)
00000054: popz
00000058: push.imm.e 0
0000005C: conv.i.v
00000060: call action_set_relative(argc=1)
00000068: popz
0000006C: push.imm.e 455
00000070: pushenv 0x20ED9E0
00000074: push.imm.e 0
00000078: conv.i.v
0000007C: push.imm.e 1
00000080: conv.i.v
00000084: push.v night
0000008C: call action_if_variable(argc=3)
00000094: pop.v.v local.__b__
0000009C: push.local.v local.__b__
000000A4: conv.v.b
000000A8: bf 0x20ED9E0
000000AC: b 0x20ED9E8
000000B0: popenv 0x40ED9A4
000000B4: b 0x20ED9EC
000000B8: popenv 0x1CED9E8
000000BC: push.local.v local.__b__
000000C4: conv.v.b
000000C8: bf 0x20EDA1C
000000CC: push.imm.e 1
000000D0: conv.i.v
000000D4: push.i 16366009
000000DC: conv.i.v
000000E0: call action_sprite_color(argc=2)
000000E8: popz
000000EC: push.imm.e 455
000000F0: pushenv 0x20EDA60
000000F4: push.imm.e 0
000000F8: conv.i.v
000000FC: push.imm.e 1
00000100: conv.i.v
00000104: push.v dawn
0000010C: call action_if_variable(argc=3)
00000114: pop.v.v local.__b__
0000011C: push.local.v local.__b__
00000124: conv.v.b
00000128: bf 0x20EDA60
0000012C: b 0x20EDA68
00000130: popenv 0x40EDA24
00000134: b 0x20EDA6C
00000138: popenv 0x1CEDA68
0000013C: push.local.v local.__b__
00000144: conv.v.b
00000148: bf 0x20EDA9C
0000014C: push.imm.e 1
00000150: conv.i.v
00000154: push.i 15201023
0000015C: conv.i.v
00000160: call action_sprite_color(argc=2)
00000168: popz
0000016C: push.v y
00000174: neg.v.d
00000178: pop.v.v depth
00000180: push.imm.e 1
00000184: pop.v.i launching
0000018C: push.imm.e 0
00000190: pop.v.i ovr
00000198: push.imm.e 600
0000019C: pop.v.i life
000001A4: push.imm.e 3
000001A8: pop.v.i anmo
000001B0: push.imm.e 156
000001B4: pushenv 0x20EDB28
000001B8: push.imm.e 1
000001BC: conv.i.v
000001C0: call action_set_relative(argc=1)
000001C8: popz
000001CC: push.v wewe
000001D4: push.imm.e 40
000001D8: add.i.v
000001DC: pop.v.v wewe
000001E4: push.imm.e 0
000001E8: conv.i.v
000001EC: call action_set_relative(argc=1)
000001F4: popz
000001F8: popenv 0x40EDAE8
000001FC: push.imm.e 2
00000200: conv.i.v
00000204: push.imm.e 0
00000208: conv.i.v
0000020C: push.imm.e 617
00000210: conv.i.v
00000214: call action_if_number(argc=3)
0000021C: pop.v.v local.__b__
00000224: push.local.v local.__b__
0000022C: conv.v.b
00000230: bf 0x20EDB80
00000234: push.imm.e 5
00000238: conv.i.v
0000023C: push.imm.e 23
00000240: conv.i.v
00000244: call action_set_alarm(argc=2)
0000024C: popz
00000250: push.imm.e 0
00000254: conv.i.v
00000258: call action_set_relative(argc=1)
00000260: popz